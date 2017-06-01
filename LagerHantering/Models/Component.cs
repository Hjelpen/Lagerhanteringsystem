using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LagerHantering.Models
{
    public class Component
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string ArticleNumber { get; set; }
        public int? OrderTime { get; set; }
        public int Amount { get; set; }
        public decimal? Price { get; set; }

        [NotMapped]
        public int ComponentAmount { get; set; }
            
        
    }
}