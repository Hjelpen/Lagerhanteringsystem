using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class ArticleComponent
    {
        [Key, Column(Order = 1)]
        public int ArticleId { get; set; }
        [Key, Column(Order = 0)]
        public int ComponentId { get; set; }


        public Component Component { get; set; }
        public Article Article { get; set; }

        public int ComponentAmount { get; set; }
    }
}