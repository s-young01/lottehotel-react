import React from 'react';
import SpecialContainer from '../containers/SpecialContainer';
import Promotion from './Promotion';
import VisualSlider from './VisualSlider';

const Main = () => {
    return (
        <div>
           <VisualSlider/>
            <SpecialContainer isMain={true}/>
           <Promotion/>
        </div>
    );
};

export default Main;