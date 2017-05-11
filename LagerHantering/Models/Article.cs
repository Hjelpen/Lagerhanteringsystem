﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public List<Component> Components { get; set; }
    }
}