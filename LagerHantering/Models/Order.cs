using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LagerHantering.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Article { get; set; }
        public string Amount { get; set; }
        public DateTime Date { get; set; }

    }
}