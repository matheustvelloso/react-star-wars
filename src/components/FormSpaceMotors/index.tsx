/* eslint-disable react/jsx-props-no-spreading */

import { memo, useCallback, useEffect, useState } from 'react';

import { isExists } from 'date-fns';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ViaCepApi from 'services/ViaCepClient';

import { VehicleType } from 'types/VehicleType';

import {
  FormInputs,
  InputsContainer,
  LabelForm,
  SpanFormTitle,
  FormInputsMask,
  SpanManufacturer,
  SpanVehicleName,
  SpanVehiclePrice,
  ButtonTicket,
  ButtonCreditCard,
  ButtonPaymentConfirmation,
  SpanTicketGeneration,
  SpanError,
} from './styles';

interface IFormSpaceMotors {
  id?: string;
  vehicle?: VehicleType;
}

type FormType = {
  name: string;
  email: string;
  tel: string;
  cpf: string;
  cep: string;
  logradouro: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  cardName: string;
  cardNumber: string;
  validateDate: string;
  cvv: string;
};

const FormSpaceMotors: React.FC<IFormSpaceMotors> = ({ id, vehicle }) => {
  const [paymentType, setPaymentType] = useState('creditCard');
  const [lastCep, setLastCep] = useState('');
  const [currentCep, setCurrentCep] = useState('');
  const [currentCpf, setCurrentCpf] = useState('');
  const [currentTel, setCurrentTel] = useState('');
  const [currentCardNumber, setCurrentCardNumber] = useState('');
  const [currentValidateDate, setCurrentValidateDate] = useState('');
  const [currentCvv, setCurrentCvv] = useState('');
  const [error, setError] = useState('');
  const [dateValid, setDateValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const NormalizeNumber = useCallback(
    (num: number): string => new Intl.NumberFormat('pt-BR').format(num),
    [],
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormType>();

  const handleFormSubmit = useCallback(() => {
    navigate(
      paymentType === 'creditCard' ? `/creditCard/${id}` : `/ticket/${id}`,
    );
  }, [id, navigate, paymentType]);

  const cepValue = watch('cep');
  const cpfValue = watch('cpf');
  const telValue = watch('tel');
  const cardNumberValue = watch('cardNumber');
  const validateDateValue = watch('validateDate');
  const cvvValue = watch('cvv');

  const fetchAddress = useCallback(
    async (cep: string) => {
      try {
        setLoading(true);
        const { data } = await ViaCepApi.get(`/${cep}/json/`);
        setValue('logradouro', data.logradouro);
        setValue('district', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        if (data.erro) setError('CEP inválido');
      } finally {
        setLoading(false);
      }
    },
    [setValue],
  );

  const sanitizedFormValue = (str: string): string =>
    String(str?.replaceAll(/\D/g, ''));

  useEffect(() => {
    setCurrentCep(sanitizedFormValue(cepValue));
    setCurrentCpf(sanitizedFormValue(cpfValue));
    setCurrentTel(sanitizedFormValue(telValue));
    setCurrentCardNumber(sanitizedFormValue(cardNumberValue));
    setCurrentValidateDate(sanitizedFormValue(validateDateValue));
    setCurrentCvv(sanitizedFormValue(cvvValue));
    setDateValid(
      isExists(
        Number(currentValidateDate.slice(-2).padStart(4, '20')),
        Number(currentValidateDate.slice(0, 2)) - 1,
        10,
      ),
    );

    if (sanitizedFormValue(cepValue)?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue);
      fetchAddress(sanitizedFormValue(cepValue));
    }
    if (currentCep.length === 8) setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cepValue,
    cpfValue,
    telValue,
    cardNumberValue,
    validateDateValue,
    cvvValue,
  ]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Row className="row-cols-1 row-cols-lg-3 py-5">
        <Col className="h-100">
          <InputsContainer>
            <SpanFormTitle>Informações Pessoais</SpanFormTitle>
            <div>
              <div>
                <LabelForm htmlFor="name">Nome</LabelForm>
              </div>
              <FormInputs
                id="name"
                type="text"
                {...register('name', {
                  required: 'Preencha este campo com um nome válido',
                  minLength: {
                    value: 3,
                    message:
                      'Preencha este campo com um número válido de caracteres',
                  },
                })}
              />
              <div>
                {errors.name && <SpanError>{errors.name.message}</SpanError>}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="email">E-mail</LabelForm>
              </div>
              <FormInputs
                id="email"
                type="email"
                {...register('email', {
                  required: 'Preencha este campo com um e-mail válido',
                })}
              />
              <div>
                {errors.email && <SpanError>{errors.email.message}</SpanError>}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="tel">Telefone</LabelForm>
              </div>
              <FormInputsMask
                id="tel"
                mask="(99) 99999-9999"
                type="tel"
                {...register('tel', {
                  required: 'Preencha este campo com um número válido',
                  minLength: {
                    value: 11,
                    message:
                      'Preencha este campo com um número válido de caracteres',
                  },
                })}
              />
              <div>
                {errors.tel && <SpanError>{errors.tel.message}</SpanError>}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="cpf/cnpj">CPF/CNPJ</LabelForm>
              </div>
              <FormInputsMask
                id="cpf/cnpj"
                mask="999.999.999-99"
                type="text"
                {...register('cpf', {
                  required: 'Preencha este campo com um CPF válido',
                  minLength: {
                    value: 11,
                    message:
                      'Preencha este campo com um número válido de caracteres',
                  },
                })}
              />
              <div>
                {errors.cpf && <SpanError>{errors.cpf.message}</SpanError>}
              </div>
            </div>
          </InputsContainer>
        </Col>
        <Col className="h-100">
          <InputsContainer>
            <SpanFormTitle>Endereço</SpanFormTitle>
            <div>
              <div>
                <LabelForm htmlFor="cep">CEP</LabelForm>
              </div>
              <FormInputsMask
                id="cep"
                mask="99999-999"
                type="text"
                {...register('cep', {
                  required: 'Preencha este campo com um CEP válido',
                  minLength: {
                    value: 8,
                    message:
                      'Preencha este campo com um número válido de caracteres',
                  },
                })}
              />
              <div>
                {errors.cep && <SpanError>{errors.cep.message}</SpanError>}
                {error && <SpanError>{error}</SpanError>}
                {loading && <span>Carregando...</span>}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="logradouro">Logradouro</LabelForm>
              </div>
              <FormInputs
                id="logradouro"
                type="text"
                {...register('logradouro', {
                  required: 'Preencha este campo com uma rua válida',
                })}
              />
              <div>
                {errors.logradouro && (
                  <SpanError>{errors.logradouro.message}</SpanError>
                )}
              </div>
            </div>
            <div className="d-flex gap-3">
              <div>
                <div>
                  <LabelForm htmlFor="number">Número</LabelForm>
                </div>
                <FormInputs
                  id="number"
                  type="text"
                  {...register('number', {
                    required: 'Preencha este campo com um número válido',
                  })}
                />
                <div>
                  {errors.number && (
                    <SpanError>{errors.number.message}</SpanError>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <LabelForm htmlFor="complement">Complemento</LabelForm>
                </div>
                <FormInputs
                  id="complement"
                  type="text"
                  {...register('complement')}
                />
                <div>
                  {errors.complement && (
                    <SpanError>{errors.complement.message}</SpanError>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="district">Bairro</LabelForm>
              </div>
              <FormInputs
                id="district"
                type="text"
                {...register('district', {
                  required: 'Preencha este campo com um bairro válido',
                })}
              />
              <div>
                {errors.district && (
                  <SpanError>{errors.district.message}</SpanError>
                )}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="city">Cidade</LabelForm>
              </div>
              <FormInputs
                id="city"
                type="text"
                {...register('city', {
                  required: 'Preencha este campo com uma cidade válida',
                })}
              />
              <div>
                {errors.city && <SpanError>{errors.city.message}</SpanError>}
              </div>
            </div>
            <div>
              <div>
                <LabelForm htmlFor="state">Estado</LabelForm>
              </div>
              <FormInputs
                id="state"
                type="text"
                {...register('state', {
                  required: 'Preencha este campo com um estado válido',
                })}
              />
              <div>
                {errors.state && <SpanError>{errors.state.message}</SpanError>}
              </div>
            </div>
          </InputsContainer>
        </Col>
        <Col className="h-100">
          <InputsContainer>
            <SpanFormTitle>Forma de Pagamento</SpanFormTitle>
            <div className="d-flex">
              <ButtonCreditCard
                className="d-flex align-items-center justify-content-center"
                type="button"
                onClick={() => setPaymentType('creditCard')}
                active={paymentType}
              >
                Cartão de crédito
              </ButtonCreditCard>
              <ButtonTicket
                className="d-flex align-items-center justify-content-center"
                type="button"
                onClick={() => setPaymentType('ticket')}
                active={paymentType}
              >
                Boleto Bancário
              </ButtonTicket>
            </div>
            {paymentType === 'creditCard' ? (
              <Col>
                <div>
                  <div>
                    <LabelForm htmlFor="cardName">
                      Nome do titular do cartão
                    </LabelForm>
                  </div>
                  <FormInputs
                    id="cardName"
                    type="text"
                    {...register('cardName', {
                      required: 'Preencha este campo com um nome válido',
                    })}
                  />
                  <div>
                    {errors.cardName && (
                      <SpanError>{errors.cardName.message}</SpanError>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <LabelForm htmlFor="cardNumber">Número do cartão</LabelForm>
                  </div>
                  <FormInputsMask
                    id="cardNumber"
                    mask="9999 9999 9999 9999"
                    type="text"
                    {...register('cardNumber', {
                      required:
                        'Preencha este campo com um número de cartão válido',
                      minLength: {
                        value: 19,
                        message:
                          'Preencha este campo com um número válido de caracteres',
                      },
                    })}
                  />
                  <div>
                    {errors.cardNumber && (
                      <SpanError>{errors.cardNumber.message}</SpanError>
                    )}
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div>
                    <div>
                      <LabelForm htmlFor="validateDate">Validade</LabelForm>
                    </div>
                    <FormInputsMask
                      id="validateDate"
                      mask="99/99"
                      type="text"
                      {...register('validateDate', {
                        required: 'Preencha este campo com uma data válida',
                        minLength: {
                          value: 5,
                          message:
                            'Preencha este campo com um número válido de caracteres',
                        },
                      })}
                    />
                    <div>
                      {errors.validateDate && (
                        <SpanError>{errors.validateDate.message}</SpanError>
                      )}
                      {dateValid === false &&
                        currentValidateDate.length === 4 && (
                          <SpanError>Data inválida</SpanError>
                        )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <LabelForm htmlFor="cvv">CVC</LabelForm>
                    </div>
                    <FormInputsMask
                      id="cvv"
                      mask="999"
                      type="text"
                      {...register('cvv', {
                        required: 'Preencha este campo com um CVC válido',
                        maxLength: {
                          value: 3,
                          message:
                            'Preencha este campo com um número válido de caracteres',
                        },
                      })}
                    />
                    <div>
                      {errors.cvv && (
                        <SpanError>{errors.cvv.message}</SpanError>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              <Col className="d-flex flex-column align-items-center">
                <SpanTicketGeneration>Gerando Boleto</SpanTicketGeneration>
                <span>Clique em finalizar a compra para imprimi-lo</span>
              </Col>
            )}
          </InputsContainer>
          <InputsContainer className="d-flex flex-column mt-3">
            <SpanManufacturer>{vehicle?.manufacturer}</SpanManufacturer>
            <SpanVehicleName>{vehicle?.name}</SpanVehicleName>
            <SpanVehiclePrice>{`¢ ${NormalizeNumber(
              Number(vehicle?.cost_in_credits),
            )}`}</SpanVehiclePrice>
            <div>
              <ButtonPaymentConfirmation
                disabled={
                  currentCep.length !== 8 ||
                  currentCpf.length !== 11 ||
                  currentTel.length !== 11 ||
                  currentCardNumber.length !== 16 ||
                  currentValidateDate.length !== 4 ||
                  currentCvv.length !== 3 ||
                  dateValid === false
                }
                type="submit"
              >
                Finalizar Compra
              </ButtonPaymentConfirmation>
            </div>
          </InputsContainer>
        </Col>
      </Row>
    </form>
  );
};

export default memo(FormSpaceMotors);
