using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace Services
{
    public class UserMessage : IUserMessage
    {
        private readonly IChatWithMeRepository _chatWithMeRepository;

        public UserMessage(IChatWithMeRepository chatWithMeRepository)
        {
            _chatWithMeRepository = chatWithMeRepository ?? throw new ArgumentException(nameof(chatWithMeRepository));
        }

        public string SendMessage(Message message)
        {
            return _chatWithMeRepository.SaveMessage(message.Content, message.FromId, message.ToId, Guid.NewGuid() , message.CreatedDateTime);
        }

        public async Task<List<string>> FetchMessages(string userId)
        {
            return await _chatWithMeRepository.FetchMessages(userId);
        }
    }
    public interface IUserMessage
    {
        string SendMessage(Message message);
        Task<List<string>> FetchMessages(string userId);
    }
}
