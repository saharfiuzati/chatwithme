using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence
{
    public interface IChatWithMeRepository
    {
        string SaveMessage(string content, Guid fromId, Guid toId, Guid messageId , DateTime CreatedDateTime);
        Task<List<string>> FetchMessages(string userId);
    }
}
