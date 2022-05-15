import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const AttributeGroup: React.FC<{
  group: AttributeGroup;
  cancel?: boolean;
}> = ({ group, cancel }) => {
  const hasImg = !!Object.values(group.data.attributes).find(
    ({ type }) => type === 'image',
  );

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        flexGrow: 1,
        flexBasis: '100%',
        [theme.breakpoints.up('sm')]: {
          flexBasis: !hasImg ? '45%' : '100%',
        },
        // backgroundColor: highlight ? '#ff000038' : 'none',
        // border: highlight ? '1px solid black' : 'none',
        // borderRadius: highlight ? '0.3em' : 'none',
        // padding: highlight ? 1 : 0,
        textDecoration: cancel ? 'line-through' : 'unset',
      })}
    >
      {
        // eslint-disable-next-line array-callback-return
        Object.entries(group.data.attributes).map(([key, val]) => {
          switch (val.type) {
            case 'image':
              return (
                <Box
                  key={key}
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: theme.spacing(0.8),
                    flexBasis: '100%',
                  })}
                >
                  <Avatar
                    src={val.value}
                    alt={key}
                    variant="rounded"
                    sx={{ width: 200, height: 200 }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {key}
                  </Typography>
                </Box>
              );
              break;
            default:
              return (
                <Box
                  key={key}
                  sx={(theme) => ({
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing(0.8),
                  })}
                >
                  <Typography variant="body1" fontWeight="bold">
                    {key}
                    :
                  </Typography>
                  <Typography variant="body1">{val.value}</Typography>
                </Box>
              );
          }
        })
      }
    </Box>
  );
};

export default AttributeGroup;
