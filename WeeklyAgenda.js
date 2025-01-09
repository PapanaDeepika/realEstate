import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';

const WeeklyAgenda = ({ meetings }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const formattedItems = {};
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');

    meetings.forEach((meeting) => {
      const meetingDate = moment(meeting.meetingStartTime);
      if (meetingDate.isBetween(startOfWeek, endOfWeek, null, '[]')) {
        const dateString = meetingDate.format('YYYY-MM-DD');
        if (!formattedItems[dateString]) {
          formattedItems[dateString] = [];
        }
        formattedItems[dateString].push({
          name: `${meeting.propertyName} - ${moment(meeting.meetingStartTime).format('HH:mm')} to ${moment(meeting.meetingEndTime).format('HH:mm')}`,
          height: 50,
          day: dateString,
        });
      }
    });

    setItems(formattedItems);
  }, [meetings]);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      selected={moment().format('YYYY-MM-DD')}
      pastScrollRange={0}
      futureScrollRange={0}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default WeeklyAgenda;

