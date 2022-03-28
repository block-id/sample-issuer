import React, { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const FomrikUpload: React.FC<
  React.HTMLProps<HTMLInputElement> & {
    fileRef: React.MutableRefObject<File | null>;
  }
> = ({ fileRef, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        marginY: 1,
        gap: 1,
        alignItems: 'center',
      }}
    >
      <input
        hidden
        ref={inputRef}
        type="file"
        onChange={(event) => {
          if (event.target.files !== null) {
            const file = event.target.files[0];
            fileRef.current = file;
            setFileName(file.name);
          } else {
            fileRef.current = null;
            setFileName('');
          }
        }}
        {...props}
      />
      <Button
        variant="contained"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Upload Photograph
      </Button>
      <Typography variant="body1">{fileName}</Typography>
    </Box>
  );
};

export default FomrikUpload;
