import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function BottomSheetExample() {
  // ref to access the BottomSheet
  const bottomSheetRef = useRef(null);

   const [sheetIndex, setSheetIndex] = useState(3); // Start with the sheet open at 100%

  // snap points for BottomSheet
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('Sheet changed to index:', index);
  }, []);

  const toggleBottomSheet = () => {
    console.log("FUNCTION", sheetIndex)
bottomSheetRef.current?.close();
setSheetIndex(3)
    //  if (sheetIndex === -1) {
    //   setSheetIndex(3); // Open the BottomSheet (100%)
    // } else {
    //   setSheetIndex(-1); // Close the BottomSheet
    // }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
         snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          <Button title='close' />
         </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    backgroundColor: 'transparent',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
