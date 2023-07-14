import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import React, { useState, useCallback,useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text,BackHandler,TouchableOpacity } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { RadioButton, Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment'
function AddLeave({ navigation }) {
  const [nightMode, setNightmode] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [leaveCategory, setLeaveCategory] = useState("");
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [formDate, setFormDate] = useState(new Date())
  const [formopen, setFormOpen] = useState(false);
  const [Reason, setReason] = useState('');
  const [leaveCategoryList, setLeaveCategoryList] = useState([
    { label: 'Select Leave Category', value: 'Select Leave Category' },
    { label: 'Maternity Leave', value: 'Maternity Leave' },
    { label: 'Leave Without Pay', value: 'Leave Without Pay' },
    { label: 'Casual', value: 'Casual' },
    { label: 'Emergency', value: 'Emergency' },
    { label: 'Medical', value: 'Medical' }
  ]);
  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = useCallback(
    (params) => {
      setDate(params.date);
      setOpen(false);
    },
    [setOpen, setDate]
  );
  const onFormDismiss = useCallback(() => {
    setFormOpen(false);
  }, [setOpen]);
  const onFormConfirm = useCallback((params) => {
    setFormOpen(false);
    // setFormDate(params.dates);
    setFormDate(params.date);
    console.log('[on-change-multi]', params);
  }, []);
  const getDiffenceBetDates = () => {
    var date1 = date;
    var date2 = formDate;
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }
  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle="light-content"
          backgroundColor="#191A48"
        />
        {/* <Appbar.Header style={{ backgroundColor: '#191A48' }}>
          <Appbar.BackAction color='#fff' onPress={() => navigation.goBack()} />
          <Appbar.Content title="Add Leave"  color='#fff'/>
        </Appbar.Header> */}
        <Surface style={styles.containerStyle}>
          <SafeAreaView style={styles.safeContainerStyle}>
            <Text style={styles.labelStyle}>Leave Category</Text>
            <DropDown
              label={"Leave Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={leaveCategory}
              setValue={setLeaveCategory}
              list={leaveCategoryList}
            />
            <View style={styles.spacerStyle} />
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View style={styles.radioButton}>
                <RadioButton value="Half" color="#38A4F8" />
                <Text>Half Day</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="Single" color="#38A4F8" />
                <Text>Single Day</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="Multiple" color="#38A4F8" />
                <Text>Multiple Day</Text>
              </View>
            </RadioButton.Group>
            {value === 'Multiple' ? <>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <View>
                  <Text style={[styles.labelStyle, { marginBottom: 10 }]}>Form Date : </Text>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => setFormOpen(true)} >
                    <Text>{moment(formDate).format('DD/MM/YYYY')}          </Text>
                    <Icon name="calendar" size={25} color="#626ED4" style={{ textAlign: 'left' }} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={[styles.labelStyle, { marginBottom: 10 }]}>To  Date : </Text>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: 'black', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => setOpen(true)} >
                    <Text>{moment(date).format('DD/MM/YYYY')}          </Text>
                    <Icon name="calendar" size={25} color="#626ED4" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
              : <>
                <Text style={[styles.labelStyle, { marginBottom: 10 }]}>Date : </Text>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5 }} onPress={() => setFormOpen(true)} >
                  <Text>{moment(formDate).format('DD/MM/YYYY')}</Text>
                  <Icon name="calendar" size={25} color="#626ED4" style={{ textAlign: 'left' }} />
                </TouchableOpacity>
              </>
            }
            {value === 'Multiple' ?
              <Text style={[styles.labelStyle, { marginTop: 10 }]}>Number of Dates :  {getDiffenceBetDates()}</Text>
              :  null}
            <Text style={[styles.labelStyle, { marginTop: 10 }]}>Reason : </Text>
            <TextInput
              multiline
              mode="outlined"
              label='Reason'
              numberOfLines={4}
              value={Reason}
              onChangeText={(Reason) => { setReason(Reason) }}
            />
            <View style={styles.buttonSection}>
              <Button style={styles.closeButtonStyle} mode="contained" onPress={() => navigation.goBack()}>
                <Text style={{ color: '#212529' }}>Close</Text>
              </Button>
              <Button style={styles.addButtonStyle} mode="contained" onPress={() => navigation.goBack()}>
                Add
              </Button>
            </View>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={open}
              onDismiss={onDismissSingle}
              date={date}
              onConfirm={onConfirmSingle} />
            <DatePickerModal
              locale="en"
              mode="single"
              visible={formopen}
              onDismiss={onFormDismiss}
              dates={formDate}
              onConfirm={onFormConfirm} />
          </SafeAreaView>
        </Surface>
      </ThemeProvider>
    </Provider>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 20,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
  },
  radioButton: {
    flexDirection: 'row', alignItems: 'center'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  addButtonStyle: {
    borderRadius: 5,
    backgroundColor: '#F58E5E',
    borderColor: '#F58E5E'
  },
  closeButtonStyle: {
    borderRadius: 5,
    backgroundColor: '#E9ECEF',
    borderColor: '#E9ECEF',
    marginRight: 15
  },
  labelStyle: {
    fontSize: 18, color: '#5B626B', fontWeight: '500', marginBottom: 5
  }
});
export default AddLeave;

