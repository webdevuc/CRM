import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetByFetch(url) {
  const  token= await AsyncStorage.getItem('user_token')
  const headers = { 'Authorization': `Bearer `+ JSON.parse(token) }
  const response = await fetch('http://staging.walstartechnologies.com/api/' + url,{headers});
  const responseJson = await response.json();
  return responseJson;
}
