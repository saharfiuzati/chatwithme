using Microsoft.Extensions.Configuration;

namespace Common
{
    public class Configuration
    {
        readonly IConfiguration config;

        public Configuration(IConfiguration config)
        {
            this.config = config;
        }

        public string ProjectId => config["ProjectId"];
        public string FilePath => config["FilePath"];
    }
}
