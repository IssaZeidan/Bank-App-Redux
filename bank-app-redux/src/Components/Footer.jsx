import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer>&copy; {currentYear} Bank App. All rights reserved.</footer>;
};

export default Footer;