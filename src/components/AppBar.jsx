import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from './../theme';

import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 80,
    backgroundColor: theme.colors.appBarBackGround
  }
});

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useMe();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const notLoggedInContents = () => {
    return (
      <>
        <AppBarTab tabTitle='Sign In' onPress={() => navigate('/signin', { replace: true })}/>
        <AppBarTab tabTitle='Sign Up' onPress={() => navigate('/signup', { replace: true })}/>
      </>
    );
  };

  const loggedInContents = () => {
    return (
      <>
        <AppBarTab tabTitle='Create A Review' onPress={() => navigate('/createReview', { replace: true })}/>
        <AppBarTab tabTitle='My Reviews' onPress={() => navigate('/myreviews')}/>
        <AppBarTab tabTitle='Sign Out' onPress={handleSignOut}/>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabTitle='Repositories' onPress={() => navigate('/', { replace: true })}/>
        {
          data && data.me ?
          loggedInContents() : notLoggedInContents()
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;