import React from 'react';

import $ from 'jquery';

const CheckedPhoneInput = () => {

    let numRegi = /^[0-9\s]*$/;

    $.each($('input.noString'), function (index, item) {


        $(item).on('key', function () {
            if (numRegi.test($(item).val()) === true) {
                return true
            } else {
                return false
            }

        })

    })


    return (
        <>

        </>
    );
}

export default CheckedPhoneInput;
