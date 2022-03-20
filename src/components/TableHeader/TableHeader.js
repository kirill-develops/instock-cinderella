import React from 'react'
import SortIco from '../../assets/icons/sort-24px.svg';
import './TableHeader.scss'

const TableHeader = ({ header }) => {
  return (
    <div className='header' style={{ flex: header.flex }}>
      <>
        <h3 className='header__label'>{header.header}</h3>
        <img src={SortIco} alt="sort icon" className='header__icon' />
      </>
    </div>
  )
};

export default TableHeader;