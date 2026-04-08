import React from 'react';

import menuIcon from '../../icons/Menu.png';

// const MenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, ...props }) => (
//   <div
//     style={{
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#CCCCCC',
//     }}
//   >
//     <button
//       type="button"
//       {...props}
//       style={{
//         ...style,
//         width: '80%',
//         maxWidth: '280px',
//         minHeight: '44px',
//         padding: '10px',
//         border: 'none',
//         background: '#CCCCCC',
//         cursor: 'pointer',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           gap: '6px',
//           backgroundColor: "#CCCCCC"
//         }}
//       >
//         <span
//           style={{
//             width: '100%',
//             height: '3px',
//             borderRadius: '2px',
//             background: '#000',
//           }}
//         />
//         <span
//           style={{
//             width: '100%',
//             height: '3px',
//             borderRadius: '2px',
//             background: '#000',
//           }}
//         />
//         <span
//           style={{
//             width: '100%',
//             height: '3px',
//             borderRadius: '2px',
//             background: '#000',
//           }}
//         />
//       </div>
//     </button>
//   </div>
// );

const MenuButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, ...props }) => (
  <button
    type="button"
    {...props}
    style={{
      ...style,
      padding: 0,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img
      src={menuIcon}
      alt="Menu"
      style={{ width: '40px', height: '40px', display: 'block' }}
    />
  </button>
);

export default MenuButton;
