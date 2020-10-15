import React from 'react';
import { faListAlt, faMoneyBillAlt, faTachometerAlt, faPlusSquare, faUserTie, faFileInvoiceDollar, faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "../Account/Header";
import { logout } from "../Actions/securityAction";


export const SidebarData = [
    {
        title: 'Tableau de bord',
        path: '/dashboard',
        icon: <FontAwesomeIcon icon={faTachometerAlt} />,
        cName: 'nav-text'
    },

    {
        title: 'Budgets',
        path: '/budgets',
        icon: <FontAwesomeIcon icon={faMoneyBillAlt} />,
        cName: 'nav-text'
    },

    {
        title: 'PE Actuel',
        path: '/programme-actuel',
        icon: <FontAwesomeIcon icon={faListAlt} />,
        cName: 'nav-text'
    },

    {
        title: 'Vacations',
        path: '/vacations',
        icon: <FontAwesomeIcon icon={faUserTie} />,
        cName: 'nav-text'
    },

    {
        title: 'Charges',
        path: '/charges',
        icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        cName: 'nav-text'
    },

    {
        title: 'Nouveau PE',
        path: '/wizard',
        icon: <FontAwesomeIcon icon={faPlusSquare} />,
        cName: 'nav-text'
    },

    {
        title: 'Deconnexion',
        path:'/logout',
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        cName: 'nav-text'
    },

    
];