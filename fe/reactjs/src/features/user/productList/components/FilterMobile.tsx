import * as React from 'react';
import { CheckboxElements } from '../../../../models/checkbox-elements.model';

export interface IFilterMobileProps {
  checkboxElements: CheckboxElements;
}

export function FilterMobile ({ checkboxElements }:IFilterMobileProps) {
  return (
    <div className='md:hidden mx-2 my-2 bg-white'>
        
    </div>
  );
}
