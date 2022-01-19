import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Avatar from 'avataaars';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import EditableTypography from '../components/EditableTypography';
import { UserType } from '../types/types';
import AvatarEditor from '../components/AvatarEditor';
import { useGlobalContext } from '../context/GlobalContext';
import { GlobalActionNames } from '../types/contexttypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginBottom: {
      marginBottom: theme.spacing(3),
    },
    noPadding: {
      padding: '0!important',
    },
    gridPadding: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
  })
);

const UserProfileScreen = () => {
  const { user: originalUser, updateUser } = useAuth();
  const { dispatch } = useGlobalContext();
  const [user, setUser] = useState<UserType>(originalUser!);
  const { t } = useTranslation();
  const classes = useStyles();

  const changeAvatar = (type: string, value: string) => {
    setUser((v: UserType) => ({
      ...v,
      avatar: { ...v.avatar, [type]: value },
    }));
  };

  if (!user) {
    return (
      <Typography
        variant="h5"
        component="h5"
        id="profile-header"
        classes={{ root: classes.marginBottom }}
      >
        {t('user.not logged in')}
      </Typography>
    );
  }

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        id="profile-header"
        classes={{ root: classes.marginBottom }}
      >
        {t('edit profile')}
      </Typography>

      <Typography variant="body1">
        <Grid container spacing={4}>
          <Grid alignContent="flex-start" item container xs={12} sm={7} lg={6}>
            <Grid item xs={5} md={3} classes={{ root: classes.gridPadding }}>
              {t('user.name')}:
            </Grid>
            <Grid item xs={7}>
              <EditableTypography
                text={user.name}
                onSubmit={(name) =>
                  updateUser({ ...user, name })
                    .then(() =>
                      dispatch({
                        type: GlobalActionNames.SHOW_SNACKBAR,
                        payload: {
                          snackbar: {
                            message: 'snackbar.user-updated',
                            severity: 'success',
                          },
                        },
                      })
                    )
                    .catch((err) =>
                      dispatch({
                        type: GlobalActionNames.SHOW_SNACKBAR,
                        payload: {
                          snackbar: {
                            message: 'snackbar.user-updated-failed',
                            severity: 'error',
                          },
                        },
                      })
                    )
                }
                onEscape={() => null}
                autoFocus
              />
            </Grid>
            <Grid item xs={5} md={3} classes={{ root: classes.gridPadding }}>
              {t('user.email')}:
            </Grid>
            <Grid item xs={7}>
              {user.email}
            </Grid>
            <Grid item xs={5} md={3} classes={{ root: classes.gridPadding }}>
              {t('user.avatar')}:
            </Grid>
            <Grid item xs={7}>
              <AvatarEditor user={user} setAvatar={changeAvatar} />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={3}
            md={5}
            classes={{ root: classes.noPadding }}
          >
            <Avatar
              style={{
                width: '150px',
                height: '150px',
                marginBottom: '10px',
                flexBasis: '33%',
              }}
              avatarStyle="Circle"
              topType={user.avatar.topType}
              accessoriesType={user.avatar.accessoriesType}
              hairColor={user.avatar.hairColor}
              facialHairType={user.avatar.facialHairType}
              facialHairColor={user.avatar.facialHairColor}
              clotheType={user.avatar.clotheType}
              clotheColor={user.avatar.clotheColor}
              eyebrowType={user.avatar.eyebrowType}
              mouthType={user.avatar.mouthType}
              skinColor={user.avatar.skinColor}
            />
          </Grid>
        </Grid>
      </Typography>
    </>
  );
};

export default UserProfileScreen;
