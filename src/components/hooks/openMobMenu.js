import React, { useLayoutEffect } from 'react';

import $ from 'jquery';

const OpenMobMenu = () => {

    useLayoutEffect(() => {

        document.querySelector('.openMob').onclick = function () {

            if (document.querySelector('.headerMobWrap').classList.contains('openMenu') === false) {
                document.querySelector('.headerMobWrap').classList.add('openMenu')
            } else {
                document.querySelector('.headerMobWrap').classList.remove('openMenu')
            }

        }


        document.querySelector('.closeMob').onclick = function () {

            document.querySelector('.headerMobWrap').classList.remove('openMenu')

        }


        document.querySelectorAll('.headerMobileMenu a').forEach(element => {

            element.onclick = function () {

                document.querySelector('.headerMobWrap').classList.remove('openMenu')
            }
        });

    }, [])


    return (
        <>

        </>
    );
}

export default OpenMobMenu;
