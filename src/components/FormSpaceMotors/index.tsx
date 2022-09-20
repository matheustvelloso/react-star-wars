/* eslint-disable react/jsx-props-no-spreading */

import { memo, useCallback, useEffect, useState } from 'react';

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
  _vehicle?: VehicleType;
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

const FormSpaceMotors: React.FC<IFormSpaceMotors> = ({ id, _vehicle }) => {
  const [paymentType, setPaymentType] = useState('creditCard');
  const [lastCep, setLastCep] = useState('');

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

  const fetchAddress = useCallback(
    async (cep: string) => {
      const { data } = await ViaCepApi.get(`/${cep}/json/`);
      setValue('logradouro', data.logradouro);
      setValue('district', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.uf);
    },
    [setValue],
  );

  useEffect(() => {
    const sanitizedCEP = cepValue?.replaceAll(/\D/g, '');

    if (sanitizedCEP?.length === 8 && cepValue !== lastCep) {
      setLastCep(cepValue);
      fetchAddress(sanitizedCEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);

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
                type="button"
                onClick={() => setPaymentType('creditCard')}
                active={paymentType}
              >
                Cartão de crédito
              </ButtonCreditCard>
              <ButtonTicket
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
                  <FormInputs
                    id="cardNumber"
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
                    </div>
                  </div>
                  <div>
                    <div>
                      <LabelForm htmlFor="cvv">CVC</LabelForm>
                    </div>
                    <FormInputs
                      id="cvv"
                      type="text"
                      {...register('cvv', {
                        required: 'Preencha este campo com um CVC válido',
                        minLength: {
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
            <SpanManufacturer>{_vehicle?.manufacturer}</SpanManufacturer>
            <SpanVehicleName>{_vehicle?.name}</SpanVehicleName>
            <SpanVehiclePrice>{`¢ ${NormalizeNumber(
              Number(_vehicle?.cost_in_credits),
            )}`}</SpanVehiclePrice>
            <div>
              <ButtonPaymentConfirmation type="submit">
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
