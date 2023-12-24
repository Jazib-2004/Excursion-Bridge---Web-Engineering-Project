import React, {useRef} from 'react'
import './search-bar.css'
import {Col, Form, FormGroup} from 'reactstrap'
const SearchBar = () => {
    const locationRef = useRef('');
    const days = useRef(0);
    const cost = useRef(0);

    const searchHandler=()=>{
        const location = locationRef.current.value;
        const distance = days.current.value;
        const maxGroupSize = cost.current.value;

        if (location==='' || distance==='' || maxGroupSize ===''){
            return alert('All field are required!')
        }

    }
  return (
    <Col lg='12'>
    <div className='search__bar m-auto'>
      <Form className='d-flex align-items-center gap-4'>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i class="ri-map-pin-line"></i></span>
            <div>
                <h6>Location</h6>
                <input type="text" placeholder='Where are you going?' ref={locationRef} />
            </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i class="ri-map-pin-time-line"></i></span>
            <div>
                <h6>Days</h6>
                <input type="number" placeholder='No of Days' ref={days} />
            </div>
        </FormGroup>
        <FormGroup className='d-flex gap-3 form__group form__group-last'>
            <span><i class="ri-group-line"></i></span>
            <div>
                <h6>Max Price</h6>
                <input type="number" placeholder='Cost' ref={cost} />
            </div>
        </FormGroup>
        <span className='search__icon' type='submit' onClick={searchHandler}>
            <i class="ri-search-line"></i>
        </span>
      </Form>
    </div>

    </Col>
  )
}

export default SearchBar
