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
        public int Amount { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
        public string User { get; set; }

        public bool InvoiceSent { get; set; }
    }
}