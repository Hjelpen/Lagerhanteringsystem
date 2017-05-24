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
        public int Id { get; set; }
        public int ComponentId { get; set; }
        public Component Component { get; set; }
        public int ArticleId { get; set; }
        public Article Article { get; set; }

        public int ComponentAmount { get; set; }
    }
}