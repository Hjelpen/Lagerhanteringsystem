using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class Component
    {
        [Key]
        public int Id { get; set; }
        public string ComponentName { get; set; }
        public string ArticleNumber { get; set; }
        public string OrderTime { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }

    }
}