using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static System.Console;
using CSV;

namespace Domain
{
    //public static class BotMessage
    //{
    //    public static List<string> ReturnAllBotMessages()
    //    {
    //        return BotMessages.All.ToList().ForEach(c => c.Content);
    //    }

    //}
    public static class BotMessage
    {
        public static List<string> ReturnAll()
        {
            var list = BotMessages.All.Select(c => c.Content).ToList();
            return BotMessages.All.Select(c => c.Content).ToList();
        }
    }
}
