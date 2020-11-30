using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace ChatWithMeApi.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [Route("/botmessages")]
        public List<string> SendBotMessages()
        {
            return BotMessage.ReturnAll();
        }
    }
}