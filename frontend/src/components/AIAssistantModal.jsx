import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Send, Bot, User, Plus, MessageSquare, Copy, Check, 
  ThumbsUp, ThumbsDown, RotateCcw, ChevronDown, Code, Zap, Image as ImageIcon, Trash2,
  Maximize2, Minimize2, PanelRightClose, Flame, Cpu, Globe
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { useNavigate } from 'react-router-dom';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 3.6 Flash (High)');

  const [chats, setChats] = useState([
    { id: 'c1', title: 'Distributed Systems & Raft', active: true },
    { id: 'c2', title: 'ML Backprop Calculus', active: false },
    { id: 'c3', title: 'Compiler LALR Parser', active: false }
  ]);

  const [activeChatId, setActiveChatId] = useState('c1');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "### Welcome to AI Multimodal Copilot 🤖\n\nI am your unified AI Assistant powered by **ChatGPT (GPT-4o)**, **Claude 3.5 Sonnet**, and **Gemini 1.5 Pro**. You can:\n\n- 📷 **Upload any Doubt Image** (Math equations, circuit diagrams, code screenshots, exam questions)\n- 💻 Write & debug Python, Java, C++, SQL, React code with step-by-step logic\n- 📝 Ask any question on any topic for deep articulate explanations\n- 📅 Generate personalized study timetables\n\nSelect your AI engine model above or ask any doubt to get started!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setSelectedImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewChat = () => {
    const newId = `c_${Date.now()}`;
    setChats([
      { id: newId, title: 'New Conversation', active: true },
      ...chats.map(c => ({ ...c, active: false }))
    ]);
    setActiveChatId(newId);
    setMessages([
      {
        id: Date.now(),
        sender: 'assistant',
        text: `Started a new conversation with **${selectedModel}**! How can I assist with your code, doubts, or study tasks?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Realistic Token-by-Token Streaming Effect like ChatGPT / Claude / Gemini
  const streamAIResponse = (fullText, msgId) => {
    const words = fullText.split(' ');
    let currentWordIndex = 0;
    
    // Add empty message container first
    setMessages(prev => [
      ...prev,
      {
        id: msgId,
        sender: 'assistant',
        text: '',
        isStreaming: true,
        model: selectedModel,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        const nextChunk = words.slice(0, currentWordIndex + 1).join(' ');
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, text: nextChunk } : m));
        currentWordIndex++;
      } else {
        clearInterval(interval);
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isStreaming: false } : m));
        setIsTyping(false);
      }
    }, 22);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim() && !selectedImage) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim() || (selectedImage ? "Solve this image doubt" : ""),
      image: selectedImage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentImage = selectedImage;
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const response = await aiService.sendChatGPTMessage(text.trim(), currentImage, selectedModel);
      let aiReply = response.reply || "I've processed your request.";

      const newMsgId = Date.now() + 1;
      streamAIResponse(aiReply, newMsgId);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: "I am having trouble processing the request right now. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text, msgId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderFormattedText = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
        const codeText = language ? lines.slice(1).join('\n') : lines.join('\n');

        return (
          <div key={index} style={{
            margin: '0.75rem 0',
            borderRadius: 'var(--radius-md)',
            background: '#0d1117',
            border: '1px solid var(--border-color)',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              padding: '0.4rem 0.85rem',
              background: '#161b22',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>{language || 'code'}</span>
              <button 
                onClick={() => copyToClipboard(codeText, index)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedId === index ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
                <span>{copiedId === index ? 'Copied' : 'Copy code'}</span>
              </button>
            </div>
            <pre style={{
              padding: '0.85rem 1rem',
              margin: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.82rem',
              color: '#e6edf3',
              overflowX: 'auto',
              lineHeight: 1.45
            }}>
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      // Markdown Table Parser
      if (part.includes('|') && part.includes('-')) {
        const tableLines = part.trim().split('\n').filter(l => l.trim().startsWith('|'));
        if (tableLines.length >= 2) {
          const headers = tableLines[0].split('|').map(c => c.trim()).filter(Boolean);
          const rows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

          if (headers.length > 0) {
            return (
              <div key={index} style={{ overflowX: 'auto' }}>
                <table className="ai-markdown-table">
                  <thead>
                    <tr>
                      {headers.map((h, i) => <th key={i}>{h.replace(/\*\*/g, '')}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => <td key={cIdx}>{cell.replace(/\*\*/g, '')}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }
      }

      return (
        <div key={index} style={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {part}
        </div>
      );
    });
  };

  const promptPills = [
    "📷 Solve Calculus & Matrix Doubt",
    "Write Python Knapsack DP solver",
    "Explain Raft Leader Election step by step",
    "Create 3-Day revision schedule"
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justify: 'flex-end',
      zIndex: 1000
    }}>
      {/* Slide Panel */}
      <div className="animate-fade-in" style={{
        width: isExpanded ? '100vw' : '780px',
        maxWidth: '100vw',
        height: '100vh',
        display: 'flex',
        background: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-highlight)',
        boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '240px',
          background: 'rgba(15, 23, 42, 0.98)',
          borderRight: '1px solid var(--border-color)',
          display: isExpanded ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '1rem'
        }}>
          <button 
            onClick={handleNewChat}
            className="btn btn-secondary" 
            style={{ width: '100%', justifyContent: 'flex-start', gap: '0.5rem', height: '40px', marginBottom: '1rem', border: '1px solid var(--border-highlight)' }}
          >
            <Plus size={16} /> <span>New Chat</span>
          </button>

          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            Academic Chat History
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, overflowY: 'auto' }}>
            {chats.map(chat => (
              <button 
                key={chat.id}
                onClick={() => {
                  setChats(chats.map(c => ({ ...c, active: c.id === chat.id })));
                  setActiveChatId(chat.id);
                }}
                className={`btn btn-secondary ${chat.active ? 'active-nav' : ''}`}
                style={{
                  justify: 'flex-start',
                  width: '100%',
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  border: 'none',
                  background: chat.active ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  color: chat.active ? 'var(--text-main)' : 'var(--text-muted)'
                }}
              >
                <MessageSquare size={14} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.title}</span>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Zap size={14} style={{ color: 'var(--accent-amber)' }} /> Multi-Model Stream Active
            </span>
          </div>
        </div>

        {/* Main Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
          {/* Header Controls */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.02)'
          }}>
            {/* Model Switcher Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <select 
                  className="form-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{
                    height: '36px',
                    paddingRight: '2.2rem',
                    paddingLeft: '2.5rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    borderRadius: '20px',
                    border: '1px solid var(--primary)',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Gemini 3.6 Flash (High)">Gemini 3.6 Flash (High)</option>
                  <option value="Gemini 3.6 Flash (Medium)">Gemini 3.6 Flash (Medium)</option>
                  <option value="Gemini 3.6 Flash (Low)">Gemini 3.6 Flash (Low)</option>
                  <option value="Gemini 3.5 Flash (High)">Gemini 3.5 Flash (High)</option>
                  <option value="Gemini 3.5 Flash (Medium)">Gemini 3.5 Flash (Medium)</option>
                  <option value="Gemini 3.5 Flash (Low)">Gemini 3.5 Flash (Low)</option>
                  <option value="Gemini 3.1 Pro (High)">Gemini 3.1 Pro (High)</option>
                  <option value="Gemini 3.1 Pro (Low)">Gemini 3.1 Pro (Low)</option>
                  <option value="Claude Sonnet 4.6 (Thinking)">Claude Sonnet 4.6 (Thinking)</option>
                  <option value="Claude Opus 4.6 (Thinking)">Claude Opus 4.6 (Thinking)</option>
                  <option value="GPT-OSS 120B (Medium)">GPT-OSS 120B (Medium)</option>
                </select>
                <Sparkles size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-cyan)' }} />
              </div>

              <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
                Real-Time Streaming Active
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="btn btn-secondary btn-icon"
                style={{ width: '36px', height: '36px' }}
                title={isExpanded ? 'Restore Panel' : 'Expand Full Screen'}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <button 
                onClick={onClose} 
                className="btn btn-secondary btn-icon"
                style={{ width: '36px', height: '36px', color: 'var(--accent-rose)' }}
                title="Close Panel"
              >
                <PanelRightClose size={18} />
              </button>
            </div>
          </div>

          {/* Messages Stream Container with Custom Scrollbar */}
          <div className="ai-stream-scrollbar" style={{
            flex: 1,
            padding: '1.5rem 2rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {messages.map((m) => (
              <div key={m.id} style={{
                display: 'flex',
                gap: '1rem',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: m.sender === 'user' ? '82%' : '100%',
                width: m.sender === 'assistant' ? '100%' : 'auto'
              }}>
                {m.sender === 'assistant' && (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: selectedModel.includes('Claude') ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : selectedModel.includes('Gemini') ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'linear-gradient(135deg, #10b981, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    flexShrink: 0, boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Bot size={20} />
                  </div>
                )}

                <div style={{
                  flex: 1,
                  padding: m.sender === 'user' ? '0.85rem 1.25rem' : '0',
                  borderRadius: m.sender === 'user' ? 'var(--radius-lg)' : '0',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent',
                  color: 'var(--text-main)',
                  fontSize: '0.94rem'
                }}>
                  {m.image && (
                    <div style={{ marginBottom: '0.75rem' }}>
                      <img 
                        src={m.image} 
                        alt="Uploaded Doubt" 
                        style={{ maxWidth: '340px', maxHeight: '240px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.2)' }}
                      />
                    </div>
                  )}

                  {m.sender === 'user' ? (
                    <div>{m.text}</div>
                  ) : (
                    <div>
                      {renderFormattedText(m.text)}
                      {m.isStreaming && (
                        <span style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--primary)', marginLeft: '4px', verticalAlign: 'middle', animation: 'pulseGlow 0.8s infinite' }} />
                      )}
                      
                      {!m.isStreaming && (
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.85rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                          <button 
                            onClick={() => copyToClipboard(m.text, m.id)}
                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Copy size={14} /> Copy Answer
                          </button>
                          <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ThumbsUp size={14} /> Helpful
                          </button>
                          <button 
                            onClick={() => handleSendMessage("Explain this solution further step-by-step.")}
                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <RotateCcw size={14} /> Elaborate
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    flexShrink: 0
                  }}>
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && messages[messages.length - 1]?.sender === 'user' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                }}>
                  <Bot size={20} />
                </div>
                <div style={{ display: 'flex', gap: '4px', padding: '0.5rem 0' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', animation: 'pulseGlow 1s infinite' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)', animation: 'pulseGlow 1s infinite 0.2s' }} />
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', animation: 'pulseGlow 1s infinite 0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div style={{ padding: '0.5rem 2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {promptPills.map((pill, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  if (pill.includes('📷')) {
                    fileInputRef.current?.click();
                  } else {
                    handleSendMessage(pill);
                  }
                }}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem', whiteSpace: 'nowrap', borderRadius: '20px' }}
              >
                <Code size={13} style={{ color: 'var(--accent-cyan)' }} /> {pill}
              </button>
            ))}
          </div>

          {/* Selected Image Thumbnail Preview */}
          {selectedImage && (
            <div style={{ padding: '0.5rem 2rem', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={selectedImage} 
                  alt="Doubt Preview" 
                  style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary)' }}
                />
                <button 
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'var(--accent-rose)', color: '#fff', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <X size={12} />
                </button>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                📷 Doubt Image Attached! Type any question or press Send to solve.
              </span>
            </div>
          )}

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleImageSelect}
          />

          {/* Footer Input Bar */}
          <div style={{ padding: '1rem 2rem 1.5rem 2rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.25)' }}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary btn-icon"
                title="Upload Doubt Image (Math, Code, Diagrams, Questions)"
                style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: 'var(--radius-md)' }}
              >
                <ImageIcon size={22} style={{ color: 'var(--accent-cyan)' }} />
              </button>

              <input 
                type="text" 
                className="form-input" 
                placeholder={`Ask ${selectedModel} anything or upload doubt image...`} 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{ flex: 1, height: '48px', fontSize: '0.95rem', borderRadius: 'var(--radius-md)' }}
              />

              <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 1.6rem', borderRadius: 'var(--radius-md)' }} disabled={isTyping}>
                <Send size={18} />
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.65rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <span>Streaming Engine Powered by {selectedModel}</span>
              <button 
                onClick={() => { onClose(); navigate('/ai-planner'); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              >
                Open Full Timetable Optimizer →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
