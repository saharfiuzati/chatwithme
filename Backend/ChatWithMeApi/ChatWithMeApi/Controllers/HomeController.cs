using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace ChatWithMeApi.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IUserMessage _userMessage;

        public HomeController(IUserMessage userMessage)
        {
            _userMessage = userMessage ?? throw new ArgumentException(nameof(userMessage));
        }

        [HttpPost]
        [Route("/message")]
        public string CreateUserMessage([FromBody]Message message)
        {
            return _userMessage.SendMessage(message);
        }

        [HttpPost]
        [Route("/messages")]
        public async Task<List<string>> FetchMessages([FromBody] User user)
        {
            return await _userMessage.FetchMessages(user.UserId.ToString());
        }
    }
}
