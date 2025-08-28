import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  User,
  Clock,
  Send
} from 'lucide-react';

interface TranscriptLine {
  id: string;
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: string;
  keywords?: string[];
}

interface Keyword {
  word: string;
  type: 'positive' | 'negative' | 'neutral';
  count: number;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
}

const CallCenterDashboard = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const [chatInput, setChatInput] = useState('');
  
  // Mock data
  const [transcript, setTranscript] = useState<TranscriptLine[]>([
    {
      id: '1',
      speaker: 'customer',
      text: 'Dzień dobry, dzwonię w sprawie problemu z płatnością',
      timestamp: '14:32:15',
      keywords: ['problem', 'płatność']
    },
    {
      id: '2',
      speaker: 'agent',
      text: 'Dzień dobry, bardzo chętnie pomogę Panu w tej sprawie. Czy może Pan podać numer umowy?',
      timestamp: '14:32:22'
    },
    {
      id: '3',
      speaker: 'customer',
      text: 'Tak, numer to 12345678. Mam problem z obciążeniem karty',
      timestamp: '14:32:35',
      keywords: ['problem', 'karta']
    }
  ]);

  const [keywords] = useState<Keyword[]>([
    { word: 'problem', type: 'negative', count: 2 },
    { word: 'płatność', type: 'neutral', count: 1 },
    { word: 'karta', type: 'neutral', count: 1 },
    { word: 'pomoc', type: 'positive', count: 1 }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: 'Witaj! Jestem tu, aby pomóc Ci w obsłudze klienta. Zadaj mi pytanie dotyczące procedur lub bazy wiedzy.',
      timestamp: '14:30:00'
    }
  ]);

  const customerInfo = {
    name: 'Jan Kowalski',
    phone: '+48 123 456 789',
    accountNumber: '12345678',
    status: 'Premium',
    lastContact: '2024-01-15'
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: 'W przypadku problemów z płatnością, sprawdź sekcję "Rozliczenia" w systemie CRM. Możesz również skorzystać z opcji odroczenia płatności na 14 dni.',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header z kontrolkami rozmowy */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Aktywna rozmowa</span>
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    05:42
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isMuted ? 'Wyciszony' : 'Mikrofon'}
                </Button>
                
                <Button
                  variant={isRecording ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Nagrywanie
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsCallActive(false)}
                >
                  <PhoneOff className="w-4 h-4" />
                  Zakończ
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Główny layout z trzema sekcjami */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-180px)]">
          {/* Lewa kolumna - Informacje o kliencie i słowa kluczowe */}
          <div className="col-span-3 space-y-4">
            {/* Informacje o kliencie */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Dane klienta</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Imię i nazwisko</p>
                  <p className="font-medium">{customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Numer telefonu</p>
                  <p className="font-medium">{customerInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nr umowy</p>
                  <p className="font-medium">{customerInfo.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {customerInfo.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ostatni kontakt</p>
                  <p className="font-medium">{customerInfo.lastContact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detektor słów kluczowych */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Słowa kluczowe</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {keywords.map((keyword) => (
                    <div key={keyword.word} className="flex items-center justify-between">
                      <Badge
                        variant={
                          keyword.type === 'positive' ? 'default' : 
                          keyword.type === 'negative' ? 'destructive' : 
                          'secondary'
                        }
                        className={
                          keyword.type === 'positive' ? 'bg-success text-success-foreground' :
                          keyword.type === 'negative' ? '' :
                          'bg-warning text-warning-foreground'
                        }
                      >
                        {keyword.word}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {keyword.count}x
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Środkowa kolumna - Transkrypcja */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Transkrypcja rozmowy</span>
                  {isRecording && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Na żywo</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {transcript.map((line) => (
                      <div key={line.id} className={`flex ${line.speaker === 'agent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          line.speaker === 'agent' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs opacity-80">
                              {line.speaker === 'agent' ? 'Agent' : 'Klient'}
                            </span>
                            <span className="text-xs opacity-60">{line.timestamp}</span>
                          </div>
                          <p className="text-sm">{line.text}</p>
                          {line.keywords && line.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {line.keywords.map((keyword) => (
                                <Badge
                                  key={keyword}
                                  variant="secondary"
                                  className="text-xs bg-accent text-accent-foreground"
                                >
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Prawa kolumna - Chatbot */}
          <div className="col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Asystent AI</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-2 rounded-lg text-sm ${
                          message.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <p>{message.message}</p>
                          <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator className="mb-4" />
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Zadaj pytanie asystentowi..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSendChatMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallCenterDashboard;