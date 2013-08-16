fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=500;
_menuOpenDelay=150;
_subOffsetTop=2;
_subOffsetLeft=-2;



with(menuStyle=new mm_style()){
bordercolor="#8CC6FF";
borderstyle="solid";
borderwidth=1;
fontfamily="Arial, Verdana, Tahoma, Arial";
fontsize="11px";
fontstyle="normal";
headerbgcolor="#ffffff";
headercolor="#000000";
offbgcolor="#FFFFFF";
offcolor="#000000";
onbgcolor="#FFFFFF";
oncolor="#FF6600";
/*outfilter="randomdissolve(duration=0.3)";
overfilter="Fade(duration=0.2);Alpha(opacity=90);Shadow(color=#777777', Direction=135, Strength=5)"; */
padding=5;
pagebgcolor="#CDE6FF";
pagecolor="0066CC";
separatorcolor="#8CC6FF";
separatorsize=1;
subimage="/en/images/globals/menu-arrow.gif";
subimagepadding=2;
}

with(AllImagesStyle=new mm_style()){
styleid=1;
bordercolor="#000000";
borderstyle="solid";
borderwidth=0;
fontstyle="normal";
fontweight="normal";
padding=0;
}

with(milonic=new menuname("products")){
style=menuStyle;
left="offset=-10";
top="offset=10";
aI("text=Overview;url=/en/products/;");
aI("text=Getting Started;url=/en/products/getting-started/;showmenu=getstarted;");
aI("text=What's New;url=/en/products/whats-new.php;");
aI("text=Web Access Solutions;url=/en/products/web-access-solutions.php;");
aI("text=Advantages of Canto <br />Cumulus vs. OS;url=/en/products/advantages.php;");
aI("text=Add-ons & Plug-ins<br />Marketplace;url=/en/products/marketplace/;");
}

with(milonic=new menuname("getstarted")){
style=menuStyle;
left="offset=3";
top="offset=-2";
aI("text=Let's Talk;url=/en/products/getting-started/lets-talk.php;");
}

with(milonic=new menuname("solutions")){
style=menuStyle;
left="offset=-10";
top="offset=10";
aI("text=Overview;url=/en/solutions/;");
aI("text=Image Processing and Conversion;url=/en/solutions/images.php;");
aI("text=Partner Portal Two-Way Sharing;url=/en/solutions/partner-portal.php;");
aI("text=Workflow and Productivity;url=/en/solutions/workflow-productivity.php;");
aI("text=Alive Archives and Anywhere Access;url=/en/solutions/archives-access.php;");
aI("text=Cross-Platform Support and Simplicity;url=/en/solutions/cross-platform.php;");
aI("text=File Access Control and Security;url=/en/solutions/security-control.php;");

}


with(milonic=new menuname("services")){
style=menuStyle;
left="offset=-11";
top="offset=10";
aI("text=Overview;url=/en/services/;");
}

with(milonic=new menuname("partners")){
style=menuStyle;
left="offset=-11";
top="offset=10";
aI("text=Overview;url=/en/partners/;");
aI("text=Find a Partner;url=/en/partners/find/;");
aI("text=Become a Partner;url=/en/partners/become/;");
aI("text=Technology Partners;url=/en/partners/technology/;");
aI("text=Partner Training;url=/en/partners/training/;");
}


with(milonic=new menuname("about")){
style=menuStyle;
left="offset=-11";
top="offset=10";
aI("text=Overview;url=/en/company/;");
aI("text=Contact;url=/en/company/contact/;");
aI("text=About Us;url=/en/company/about/;");
aI("text=Careers;url=/en/company/careers/;");
aI("text=News & Events;url=/en/company/news/;");
aI("text=Customers;url=/en/company/customers/;");
}



with(milonic=new menuname("resources")){
style=menuStyle;
left="offset=-11";
top="offset=10";
aI("text=Overview;url=/en/resources/;");
aI("text=Case Studies;url=/en/resources/case-studies/;");
aI("text=White Papers;url=/en/whitepapers/;");
aI("text=Webinars;url=/en/resources/webinars/;");
aI("text=Downloads;url=/en/resources/downloads/;");
aI("text=Technical Information;url=/en/resources/technical/;showmenu=technical;");
aI("text=Blog Summary;url=/en/resources/newsletter/;");
}

with(milonic=new menuname("technical")){
style=menuStyle;
left="offset=3";
top="offset=-2";
aI("text=File and RAW Formats;url=/en/resources/technical/supported-file-types.php;");
aI("text=Security;url=/en/resources/technical/security.php;");
aI("text=System Requirements;url=/en/resources/technical/system-requirements.php;");
aI("text=Tours & Tutorials;url=/en/resources/technical/tutorials/;");
aI("text=Section 508 Compliance;url=/en/resources/technical/508-compliance.php;");
aI("text=Documentation;url=/en/resources/technical/documentation/;");
}



with(milonic=new menuname("support")){
style=menuStyle;
left="offset=-11";
top="offset=10";
aI("text=Overview;url=/en/support/;");
aI("text=Documentation;url=/en/resources/technical/documentation/;");
aI("text=Maintenance Renewals;url=/en/support/renewals/;");
aI("text=Support Contact Information;url=/en/support/contact.php;");
}



drawMenus();

