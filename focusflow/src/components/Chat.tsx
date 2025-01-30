// src/components/Chat.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedContainer from './AnimatedContainer';

export default function Chat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setError(null); // Clear previous errors
    const userMessage = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Ollama');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: userMessage, isUser: true },
        { text: data.response, isUser: false },
      ]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
      setMessages((prev) => [
        ...prev,
        { text: userMessage, isUser: true },
        { text: 'Error: Could not get a response.', isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedContainer>
      <Card>
        <CardHeader>
          <CardTitle>Chat with LLaMA 3</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <Avatar>
                    <AvatarFallback>
                      {msg.isUser ? 'You' : 'LLaMA'}
                    </AvatarFallback>
                  </Avatar>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}