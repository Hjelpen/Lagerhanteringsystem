using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class Article
    {
        public Article()
        {
            this.Components = new HashSet<Component>();
        }

        public int ArticleId { get; set; }
        public string Name { get; set; }

        
        public virtual ICollection<Component> Components { get; set; }
    }
}