using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Common;
using Google.Cloud.Firestore;

namespace Persistence
{
    public class ChatWithMeRepository : IChatWithMeRepository
    {
        const string MessagesTable = "Messages";
        const string UsersTable = "Users";
        private readonly FirestoreDb _fireStoreDb;
        private readonly string _filePath;
        private readonly string _projectId;
        public ChatWithMeRepository(Configuration configuration)
        {
            _filePath = configuration.FilePath;
            _projectId = configuration.ProjectId;
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", _filePath);
           _fireStoreDb = FirestoreDb.Create(_projectId);
        }
        public string SaveMessage(string content, Guid fromId, Guid toId, Guid messageId , DateTime createdDateTime)
        {
            try
            {
                CollectionReference collection = _fireStoreDb.Collection(MessagesTable);
                DocumentReference reference = collection.AddAsync(new
                {
                    Content = content,
                    FromUserId = fromId.ToString(),
                    ToUserId = toId.ToString(),
                    MessageId = messageId.ToString(),
                    CreatedDateTime = createdDateTime
                }).GetAwaiter().GetResult();

                return reference.Id;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task<List<string>> FetchMessages(string userId)
        {
            CollectionReference collection = _fireStoreDb.Collection(MessagesTable);
            Query query = collection.WhereEqualTo("ToUserId", "6e5e4537-d9c8-4283-8957-34d8fcdd7cdc");

            FirestoreChangeListener listener = query.Listen(snapshot =>
            {
                foreach (DocumentSnapshot documentSnapshot in snapshot.Documents)
                {
                    Console.WriteLine(documentSnapshot);
                }
            });
            return new List<string>();
        }
    }
}
