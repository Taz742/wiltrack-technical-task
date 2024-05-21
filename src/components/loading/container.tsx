import ReactDOM from 'react-dom';

import { Box, CircularProgress } from '@mui/material';

export const Loading = () =>
  ReactDOM.createPortal(
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: 'rgba(255, 255, 255, 0.35)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>,
    document.body
  );
