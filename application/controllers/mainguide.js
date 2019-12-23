var express = require('express');
var router = express.Router();

const getHomePage = async function (req, res) {
    res.render('./theme/backend/themeguide', {
        title: 'หน้าหลัก',
        blog_sidepanel: '',
        blog_heading: '',
        blog_breadcrumb: '',
        page: 'backend/guide/welcome',
        data: '12345'
    });
};

const getTour_listPage = (req, res) => {
    res.render('./theme/backend/themeguide', {
        title: 'ตารางงานออกทัวร์',
        blog_sidepanel: '',
        blog_heading: '',
        blog_breadcrumb: '',
        page: 'backend/guide/tour_list',
        data: ''
    });
};

const getCardguide_Page = (req, res) => {
    res.render('./theme/backend/themeguide', {
        title: 'บัตรประจำตัวไกด์',
        blog_sidepanel: '',
        blog_heading: '',
        blog_breadcrumb: '',
        page: 'backend/guide/cardguide_list',
        data: '123'
    });
};

const getEdit_profilePage = (req, res) => {
    res.render('./theme/backend/themeguide', {
        title: 'แก้ไขประวัติส่วนตัว',
        blog_sidepanel: '',
        blog_heading: '',
        blog_breadcrumb: '',
        page: 'backend/guide/edit_profile',
        data: ''
    });
};

const getInboxPage = (req, res) => {
    res.render('./theme/backend/themeguide', {
        title: 'กล่องข้อความ',
        blog_sidepanel: '',
        blog_heading: '',
        blog_breadcrumb: '',
        page: 'backend/guide/inbox',
        data: ''
    });
};

module.exports = {getHomePage, getTour_listPage, getEdit_profilePage, getInboxPage, getCardguide_Page}; 