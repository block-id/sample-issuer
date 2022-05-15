import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import AttributeGroup from './AttributeGroup';

const Card: React.FC<{
  id: VerifiableId['data'];
  highlightGroups?: string[];
  cancelUnhighlightedGroups?: boolean;
}> = ({ id, highlightGroups, cancelUnhighlightedGroups }) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid ${theme.palette.grey[200]}`,
      marginTop: 2,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '600px',
        minHeight: '300px',
      },
    })}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.1,
      }}
    >
      <Avatar
        src={id.issuer.logo}
        alt="Issuer logo"
        sx={{
          width: 150,
          height: 150,
        }}
      />
    </Box>
    <Box
      sx={{
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      }}
    >
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          padding: theme.spacing(0.8),
          background: theme.palette.grey[600],
          color: theme.palette.getContrastText(theme.palette.grey[600]),
          borderRadius: 'inherit',
        })}
      >
        <Typography variant="body1" fontWeight="bold">
          {id.issuer.name}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {id.idName}
        </Typography>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.spacing(1),
          padding: theme.spacing(2),
        })}
      >
        {id.groups.map((group) => (
          <AttributeGroup
            key={group.data.groupName}
            group={group}
            cancel={
              cancelUnhighlightedGroups
              && highlightGroups
              && !highlightGroups.includes(group.data.groupName)
            }
          />
        ))}
      </Box>
    </Box>
  </Box>
);

export default Card;
