import React, { useState } from 'react';

const messageThreads = [
  {
    id: 1,
    sender: 'Alice Johnson',
    lastMessage: 'Sure, let\'s schedule that meeting',
    unreadCount: 2,
    timestamp: '2:45 PM'
  },
  {
    id: 2,
    sender: 'Bob Smith',
    lastMessage: 'The project report is ready',
    unreadCount: 0,
    timestamp: '1:20 PM'
  },
  {
    id: 3,
    sender: 'Marketing Team',
    lastMessage: 'Weekly update attached',
    unreadCount: 1,
    timestamp: '11:30 AM'
  }
];

const conversations = {
  1: [
    { sender: 'Alice Johnson', message: 'Hi there, can we discuss the upcoming project?', time: '2:40 PM', type: 'received' },
    { sender: 'You', message: 'Here is my calendly.com/john', time: '2:42 PM', type: 'sent' },
    { sender: 'Alice Johnson', message: 'Sure, let\'s schedule that meeting', time: '2:45 PM', type: 'received' }
  ],
  2: [
    { sender: 'Bob Smith', message: 'The project report is ready for review', time: '1:15 PM', type: 'received' },
    { sender: 'You', message: 'Great, I\'ll take a look and get back to you', time: '1:18 PM', type: 'sent' }
  ],
  3: [
    { sender: 'Marketing Team', message: 'Here\'s the weekly update for the team', time: '11:25 AM', type: 'received' },
    { sender: 'Marketing Team', message: 'Please review and provide feedback', time: '11:30 AM', type: 'received' }
  ]
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  threadsPanel: {
    width: '33.33%',
    borderRight: '1px solid #edf2f7',
    backgroundColor: 'white',
  },
  threadList: {
    borderBottom: '1px solid #f7fafc',
  },
  threadItem: {
    padding: '1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threadItemActive: {
    backgroundColor: '#edf2f7',
  },
  threadDetails: {
    flex: 1,
    marginRight: '1rem',
  },
  threadSender: {
    fontWeight: 500,
  },
  threadLastMessage: {
    color: '#a0aec0',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  threadMeta: {
    display: 'flex',
    alignItems: 'center',
  },
  threadTimestamp: {
    fontSize: '0.75rem',
    color: '#a0aec0',
    marginRight: '0.5rem',
  },
  conversationPanel: {
    width: '66.67%',
    display: 'flex',
    flexDirection: 'column',
  },
  conversationHeader: {
    padding: '1rem',
    borderBottom: '1px solid #edf2f7',
    backgroundColor: '#f7fafc',
  },
  conversationMessages: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
  },
  messageSent: {
    backgroundColor: '#3b82f6',
    color: 'white',
    alignSelf: 'flex-end',
  },
  messageReceived: {
    backgroundColor: '#edf2f7',
    color: '#1a202c',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  },
  messageTime: {
    fontSize: '0.75rem',
    opacity: 0.75,
    textAlign: 'right',
  },
  conversationInput: {
    padding: '1rem',
    borderTop: '1px solid #edf2f7',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  inputField: {
    flexGrow: 1,
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRight: 'none',
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
    outline: 'none',
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    cursor: 'pointer',
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#a0aec0',
  },
};

const MessagesComponent = () => {
  const [selectedThread, setSelectedThread] = useState(null);

  const hasCalendarLink = (threadId) => {
    const threadMessages = conversations[threadId] || [];
    return threadMessages.some(msg => msg.message.toLowerCase().includes('calendly'));
  };

  const getTotalBookings = () => {
    return Object.values(conversations).reduce((count, messages) => {
      return count + (messages.some(msg => msg.message.toLowerCase().includes('calendly')) ? 1 : 0);
    }, 0);
  };

  const headerStats = {
    totalConversations: Object.keys(conversations).length,
    totalBookings: getTotalBookings()
  };

  return (
    <div style={styles.container}>
      <div style={styles.threadsPanel}>
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #edf2f7',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontWeight: 500 }}>Total Conversations:</span>
            <span style={{ 
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.875rem'
            }}>{headerStats.totalConversations}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 500 }}>Total Bookings Sent:</span>
            <span style={{ 
              backgroundColor: '#059669',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.875rem'
            }}>{headerStats.totalBookings}</span>
          </div>
        </div>
        <div style={styles.threadList}>
          {messageThreads.map((thread) => (
            <div
              key={thread.id}
              style={{
                ...styles.threadItem,
                ...(selectedThread === thread.id && styles.threadItemActive),
              }}
              onClick={() => setSelectedThread(thread.id)}
            >
              <div style={styles.threadDetails}>
                <div style={styles.threadSender}>{thread.sender}</div>
                <div style={styles.threadLastMessage}>{thread.lastMessage}</div>
              </div>
              <div style={styles.threadMeta}>
                <span style={styles.threadTimestamp}>{thread.timestamp}</span>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: hasCalendarLink(thread.id) ? '#059669' : '#3B82F6'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.conversationPanel}>
        {selectedThread ? (
          <>
            <div style={styles.conversationHeader}>
              <h3>{messageThreads.find((t) => t.id === selectedThread).sender}</h3>
            </div>

            <div style={styles.conversationMessages}>
              {conversations[selectedThread].map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageBubble,
                    ...(msg.type === 'sent' ? styles.messageSent : styles.messageReceived),
                  }}
                >
                  <p style={styles.messageText}>{msg.message}</p>
                  <div style={styles.messageTime}>{msg.time}</div>
                </div>
              ))}
            </div>

            <div style={styles.conversationInput}>
              <input
                type="text"
                placeholder="Type a message..."
                style={styles.inputField}
              />
              <button style={styles.sendButton}>Send</button>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesComponent;