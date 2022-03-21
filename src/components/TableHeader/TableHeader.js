import React from 'react'
import SortIco from '../../assets/icons/sort-24px.svg';
import './TableHeader.scss'

const TableHeader = ({ header, handleSort }) => {
  return (
    <div className='header' style={{ flex: header.flex }}>
      <>
        <h3 className='header__label'>{header.header}</h3>
        <img
          onClick={() => handleSort(header)}
          src={SortIco}
          alt="sort icon"
          className='header__icon' />
      </>
    </div>
  )
};

export default TableHeader;