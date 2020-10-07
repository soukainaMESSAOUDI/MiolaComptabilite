import React from 'react';
import { faListAlt, faMoneyBillAlt, faTachometerAlt, faPlusSquare, faUserTie, faFileInvoiceDollar, faUserAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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
        path: '/Professeurs',
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
        title: 'Compte',
        path: '/compte',
        icon: <FontAwesomeIcon icon={faUserAlt} />,
        cName: 'nav-text'
    },

    {
        title: 'Deconnexion',
        path: '/deconnexion',
        icon: <FontAwesomeIcon icon={faSignOutAlt} />,
        cName: 'nav-text'
    },

    
];