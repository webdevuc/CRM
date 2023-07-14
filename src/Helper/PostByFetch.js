import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';

export default async function PostByFetch(url, data)
{
    const token = await AsyncStorage.getItem('user_token');
        const response = await fetch('http://staging.walstartechnologies.com/api/' + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data),
        });

        // const response = await axios.get(
        //     `http://staging.walstartechnologies.com/api/` + url,
        //     {
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${JSON.parse(token)}`,
        //       },
        //       body: JSON.stringify(data),
        //     },
        //   );



        const responseJson = await response.json();
        return responseJson;                              
}


// import AsyncStorage from '@react-native-async-storage/async-storage';
// import reactotron from 'reactotron-react-native';

// export default async function PostByFetch(url, data) {
//   try {
//     const token = await AsyncStorage.getItem('user_token');
//     reactotron.log("TOKEN------------->",token)
//     const headers = {
//       'Authorization': `Bearer ${JSON.parse(token)}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     };

//     const response = await fetch('http://staging.walstartechnologies.com/api/' + url, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data),
//     });

//     const responseJson = await response.json();
//     return responseJson;
//   } catch (error) {
//     // Handle any error that occurs during the API request
//     console.error(error);
//     throw error;
//   }
// }
