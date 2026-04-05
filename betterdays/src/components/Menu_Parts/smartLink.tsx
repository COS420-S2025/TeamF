import React from 'react';

interface SmartLinkProps {
  icon: React.ReactNode;
  link: string;
  title: string;
}

const SmartLink: React.FC<SmartLinkProps> = ({ icon, link, title }) => {
  return (
    <a
      href={link}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #ccc',
        padding: '12px 0',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 'fit-content' }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>{title}</div>
    </a>
  );
};

export default SmartLink;
