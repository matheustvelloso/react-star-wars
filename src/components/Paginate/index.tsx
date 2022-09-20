import { memo } from 'react';

import { ImArrowRight2, ImArrowLeft2 } from 'react-icons/im';
import { ReactPaginateProps } from 'react-paginate';

import { Pagination } from './styles';

const Paginate: React.FC<ReactPaginateProps> = (props) => {
  return (
    <Pagination
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      nextLabel={<ImArrowRight2 />}
      previousLabel={<ImArrowLeft2 />}
    />
  );
};

export default memo(Paginate);
