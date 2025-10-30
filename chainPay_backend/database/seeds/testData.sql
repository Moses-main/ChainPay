-- Test data for development

-- Insert test users
INSERT INTO users (user_id, phone, wallet_address, balance) VALUES
('user_test_001', '+1234567890', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0', 100.00),
('user_test_002', '+1987654321', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 250.50);

-- Insert test transactions
INSERT INTO transactions (user_id, recipient, amount, tx_hash, status) VALUES
('user_test_001', '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 10.00, '0xabcd1234', 'completed'),
('user_test_001', '0x1234567890123456789012345678901234567890', 5.50, '0xefgh5678', 'completed');

-- Insert test chat history
INSERT INTO chat_history (user_id, message, is_user) VALUES
('user_test_001', 'What is my balance?', true),
('user_test_001', 'Your current balance is 100.00 USDC', false);