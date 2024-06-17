import { useState } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../ui/constants/colors";
import { goalValues, drankValues } from "../../constants/drinkValues";

interface IProps {
  handleSelectAmmount: (ammount: number) => void;
  settingGoal?: boolean;
}

export const AmmountList = ({
  handleSelectAmmount,
  settingGoal = false,
}: IProps) => {
  const [selectedItem, setSelectedItem] = useState(goalValues[0]);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setSelectedItem(viewableItems[0].item);
      handleSelectAmmount(viewableItems[0].item);
    }
  };

  const data = settingGoal ? goalValues : drankValues;

  return (
    <FlatList
      style={styles().list}
      data={data}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => {
        const isSelected = selectedItem === item;

        return (
          <TouchableOpacity
            onPress={() => setSelectedItem(item)}
            style={styles(isSelected).listItemContainer}
          >
            <Text style={styles(isSelected).listText}>{item}</Text>
          </TouchableOpacity>
        );
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 80,
      }}
    />
  );
};

const styles = (isSelected?: boolean) =>
  StyleSheet.create({
    list: {
      flex: 1,
    },
    listItemContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.darkPrimary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isSelected ? colors.actionPrimary : colors.lightPrimary,
    },
    listText: {
      fontWeight: isSelected ? "bold" : "normal",
      color: isSelected ? colors.lightPrimary : colors.darkPrimary,
      fontSize: isSelected ? 20 : 16,
    },
  });
