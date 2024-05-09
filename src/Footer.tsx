import React, { FC } from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer: FC = () => {
  return (
    <div className='footer'>
      <MDBFooter bgColor='dark' className='text-center text-lg-left'>
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-light' href='https://github.com/elpatrico11'>
            ElPatrico11
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
