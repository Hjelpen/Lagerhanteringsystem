using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LagerHantering.Models
{
    public class Component
    {
        public Component()
        {
            this.Articles = new HashSet<Article>();
        }

        public int ComponentId { get; set; }

        public string Name { get; set; }
        public string ArticleNumber { get; set; }
        public string OrderTime { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }


        [JsonIgnore]
        public virtual ICollection<Article> Articles { get; set; }

    }
}