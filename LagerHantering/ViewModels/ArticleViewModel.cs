using LagerHantering.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LagerHantering.ViewModels
{
    public class ArticleViewModel
    {
        public string Name { get; set; }

        public List<Component> Components { get; set; }
    }
}