import React from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {RFValue} from 'react-native-responsive-fontsize';
import { globalColors } from '../theme/globalColors';

const FilterModal = ({visible, onRequestClose, filterOptions, applyFilter}) => {
  const renderCheckboxes = () => {
    return filterOptions.map(option => (
      <CheckBox
        key={option.key}
        onClick={option.onClick}
        isChecked={option.isChecked}
        checkedCheckBoxColor={globalColors.primaryTheme}
        uncheckedCheckBoxColor={globalColors.primaryTheme}
        rightText={option.rightText}
        rightTextStyle={{fontSize: 14}}
      />
    ));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <Pressable style={styles.centeredView} onPressOut={onRequestClose}>
        <View style={styles.modalView}>
          <View style={styles.checkBoxView}></View>
          <Text style={styles.modalText}>Select Status </Text>
          {renderCheckboxes()}
          <TouchableOpacity style={styles.yesButton} onPress={applyFilter}>
            <Text style={styles.oktext}>OK</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: globalColors.modal,
    justifyContent: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 'auto',
    height: '55%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: '5%',
    gap: RFValue(18),
  },
  yesButton: {
    backgroundColor: 'red',
    backgroundColor: globalColors.primaryTheme,
    padding: RFValue(14),
    borderRadius: 10,
    marginTop: RFValue(10),
  },
  modalText: {
    fontSize: 18,
    marginTop: RFValue(20),
    fontWeight: 'bold',
  },

  oktext: {
    alignSelf: 'center',
    color: globalColors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkBoxView: {
    borderWidth: 2,
    width: '25%',
    alignSelf: 'center',
  },
});

export default FilterModal;
