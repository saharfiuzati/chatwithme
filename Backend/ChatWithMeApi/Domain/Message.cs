using System;

namespace Domain
{
    public class Message
    {
        public Guid FromId { get; set; }
        public Guid ToId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }
}
