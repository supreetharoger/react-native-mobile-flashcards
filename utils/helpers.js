import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
const NOTIFICATION_KEY = 'MobileFlashCards:notifications'
const DECKS_KEY = 'MobileFlashcards:decks'


export function clearLocalNotification () {
      return AsyncStorage.removeItem(NOTIFICATION_KEY)
              .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Log your stats!',
        body: "👋 don't forget o complete a quiz today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () {
    clearLocalNotification()
    let sendAfterFiveSeconds = Date.now();
        sendAfterFiveSeconds += 30000;
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                          if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                                let tomorrow = new Date()
                                tomorrow.setDate(tomorrow.getDate() + 1)
                                tomorrow.setHours(8)
                                tomorrow.setMinutes(0)

                                Notifications.scheduleLocalNotificationAsync(
                                        createNotification(),
                                        {
                                            time: tomorrow,
                                           // repeat: 'day',
                                        }
                                        )

                                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export function getInitialDecks() {
    const decks = {
        React: {
            title: 'React',
            questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
            ]
        }
    }
    return decks
}
